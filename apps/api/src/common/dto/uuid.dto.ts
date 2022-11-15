import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UUIDDTO {
  @IsUUID()
  @ApiProperty({
    uniqueItems: true,
    example: '<uuid>',
  })
  readonly id: string;
}
