import { Injectable } from '@nestjs/common'
import { Storage } from '@google-cloud/storage'
import gcloudConstant from '@libs/constant/src/gcloud.constant'
import stream from 'stream'
import { DeleteOptions } from '@google-cloud/storage/build/src/nodejs-common/service-object'
import * as crypto from 'crypto'

@Injectable()
export class StorageService {
  readonly storage: Storage

  constructor() {
    this.storage = new Storage({
      projectId: gcloudConstant.projectId,
      credentials: {
        private_key: `${process.env.GOOGLE_PRIVATE_KEY.split(
          String.raw`\n`,
        ).join('\n')}`,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        type: 'service_account',
      },
    })
  }

  async uploadImage(
    name: string,
    bucketName: string,
    image: Express.Multer.File,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const bucket = this.storage.bucket(bucketName)
      // Create file name
      const imageName = `${name.split(' ').join('-').toLowerCase()}_${crypto
        .randomBytes(8)
        .toString('hex')}.${image.originalname.split('.').pop()}`

      // Create file
      const file = bucket.file(imageName)

      // Create streaming file
      const streaming = new stream.PassThrough()
      streaming.write(image.buffer)

      const write = streaming.pipe(file.createWriteStream())

      write.on('error', (err) => {
        reject({ error: [err] })
      })

      write.on('finish', async () => {
        try {
          await file.makePublic()
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`
          resolve(publicUrl)
        } catch (e: any) {
          reject(e)
        }
      })

      streaming.end()
    })
  }

  async uploadMultipleImage(
    name: string,
    bucketName: string,
    images: Express.Multer.File[],
  ) {
    return await Promise.all(
      images.map(async (image) => this.uploadImage(name, bucketName, image)),
    )
  }

  async removeImage(name: string, bucketName: string, options?: DeleteOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const bucket = this.storage.bucket(bucketName)
        await bucket
          .file(name.split('/').pop())
          .delete({ ignoreNotFound: true, ...options })
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  }

  removeMultipleImage(
    names: string[],
    bucketName: string,
    options?: DeleteOptions,
  ) {
    return Promise.all(
      names.map((name) => {
        this.removeImage(name, bucketName, options)
      }),
    )
  }
}
