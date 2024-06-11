import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    street?: string;
    outDoor?: string;
    inteDoor?:string;
    cp?: string;
    locationId?: number;
}
