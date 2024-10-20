import { Controller } from '@nestjs/common';
import { FarmService } from './farm.service';

@Controller('api/farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}
}
