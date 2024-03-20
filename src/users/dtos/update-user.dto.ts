import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';


// When building input validation types (also called DTOs), it's often useful to build create and update variations on the same type. For example, the create variant may require all fields, while the update variant may make all fields optional.

// Nest provides the PartialType() utility function to make this task easier and minimize boilerplate.
export class UpdateUsertDto extends PartialType(CreateUserDto) {}