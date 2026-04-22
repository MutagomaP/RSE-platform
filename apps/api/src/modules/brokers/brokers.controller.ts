import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request, Query, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BrokersService, CreateBrokerProfileDto } from './brokers.service';
import { RolesGuard, Roles } from '../auth/guards';
import { JwtAuthGuard } from '../auth/guards';
import { UserRole } from '../users/user.entity';
import { BrokerStatus } from './broker.entity';

@ApiTags('brokers')
@Controller('brokers')
export class BrokersController {
  constructor(private brokersService: BrokersService) {}

  @Get()
  @ApiOperation({ summary: 'List all brokers, optionally filtered by status' })
  @ApiQuery({ name: 'status', enum: BrokerStatus, required: false })
  findAll(@Query('status') status?: BrokerStatus) {
    return this.brokersService.findAll(status);
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BROKER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my broker profile' })
  getMyProfile(@Request() req: any) {
    return this.brokersService.findByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get broker by ID' })
  findOne(@Param('id') id: string) {
    return this.brokersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BROKER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create broker profile' })
  create(@Request() req: any, @Body() dto: CreateBrokerProfileDto) {
    return this.brokersService.create(req.user.id, dto);
  }

  @Patch('my-profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BROKER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update my broker profile' })
  async update(@Request() req: any, @Body() dto: Partial<CreateBrokerProfileDto>) {
    const b = await this.brokersService.findByUserId(req.user.id);
    return this.brokersService.update(b.id, dto);
  }

  @Post(':id/approve')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve broker license (admin only)' })
  approve(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.brokersService.approve(id);
  }

  @Post(':id/suspend')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Suspend broker (admin only)' })
  suspend(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.brokersService.suspend(id);
  }
}
