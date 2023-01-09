export enum CarCondition {
  USED = 'รถมือสอง',
  NEW = 'รถใหม่',
}

export enum CarBody {
  SEDAN = 'ซีดาน',
  SPORTS = 'สปอร์ต',
  CONVERTIBLE = 'เปิดประทุน',
  HARDTOP = 'ฮาร์ดท็อป',
  LIFTBACK = 'ลิฟท์แบ็ค',
  WAGON = 'วากอน',
  MINIVAN = 'มินิแวน',
  CVAN = 'คอมเมอร์เชียลแวน',
  PICKUP = 'ปิ๊กอัพ',
  COUPE = 'คูเป้',
  SUV = 'เฮสยูวี',
}

export enum CarFuel {
  BENZENE = 'เบนซิน',
  DIESEL = 'ดีเซล',
  HYBRID = 'ไฮบริด',
  PLUGIN_HYBRID = 'ปลั๊กอิน/ไฮบริด',
  ELECTRIC = 'ไฟฟ้า',
  GAS = 'แก๊ส',
}

export interface IBrand {
  id?: string
  name: string
  image: string
  cars: ICar[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ICar {
  id?: string
  name: string
  condition: CarCondition
  image: string
  previewImages: string[]
  brand?: IBrand
  year: string
  door?: number
  seat?: number
  body?: CarBody
  transmission: string
  fuel?: CarFuel
  engineType?: string
  engineName?: string
  engineCc?: number
  peakPower?: number
  peakTorque?: number
  lengthMm?: number
  widthMm?: number
  heightMm?: number
  frontThread?: number
  rearThread?: number
  fuelTank?: number
  frontTyre?: string
  rearTyre?: string
  frontRim?: string
  rearRim?: string
  createdAt?: Date
  updatedAt?: Date
}
