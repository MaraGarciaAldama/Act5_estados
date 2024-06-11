import { PartialType } from '@nestjs/mapped-types';
import { CreateCustumerDto } from './create-custumer.dto';

export class UpdateCustumerDto extends PartialType(CreateCustumerDto) {
    name?: string;
    lastname?: string;
    rfc?:string;
    addressId?:number;
    email?:string;
    phone?: string;
    active?:boolean;
}
