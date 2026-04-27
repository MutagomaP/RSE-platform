import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Security, SecurityType, SecurityStatus } from '../securities/security.entity';
import { User, UserRole, UserStatus } from '../users/user.entity';
import { Broker, BrokerStatus } from '../brokers/broker.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Security) private securityRepo: Repository<Security>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Broker) private brokerRepo: Repository<Broker>,
  ) {}

  async seedDatabase() {
    const results = { securities: 0, users: 0, brokers: 0, message: '' };

    try {
      // Check if already seeded
      const existingSecurities = await this.securityRepo.count();
      if (existingSecurities > 0) {
        results.message = 'Database already seeded';
        console.log('ℹ️ Database already has data, skipping seed');
        return results;
      }

      console.log('📝 Seeding securities...');
      // Seed Securities
      const securities = [
        { ticker: 'BK', companyName: 'Bank of Kigali Group PLC', isin: 'RW000A1H63L5', type: SecurityType.EQUITY, sector: 'Banking', currentPrice: 328.00, previousClose: 325.00, openPrice: 326.00, highPrice: 330.00, lowPrice: 324.00, sharesOutstanding: 534000000, marketCap: 175152000000, dividendYield: 3.05, volume: 45230, currency: 'RWF', description: 'Bank of Kigali is the largest bank in Rwanda.' },
        { ticker: 'MTN', companyName: 'MTN Rwanda PLC', isin: 'RW000A2YDS77', type: SecurityType.EQUITY, sector: 'Telecommunications', currentPrice: 180.00, previousClose: 178.00, openPrice: 179.00, highPrice: 182.00, lowPrice: 177.00, sharesOutstanding: 2000000000, marketCap: 360000000000, dividendYield: 4.44, volume: 120500, currency: 'RWF', description: 'MTN Rwanda is the leading mobile telecommunications provider.' },
        { ticker: 'BRALIRWA', companyName: 'Bralirwa PLC', isin: 'RW000A0ZKHY4', type: SecurityType.EQUITY, sector: 'Consumer Goods', currentPrice: 165.00, previousClose: 163.00, openPrice: 164.00, highPrice: 167.00, lowPrice: 162.00, sharesOutstanding: 378000000, marketCap: 62370000000, dividendYield: 5.00, volume: 32100, currency: 'RWF', description: 'Rwanda leading beverage company.' },
      ];

      for (const s of securities) {
        await this.securityRepo.save(this.securityRepo.create({ ...s, status: SecurityStatus.ACTIVE }));
        results.securities++;
      }
      console.log(`✓ Created ${results.securities} securities`);

      console.log('👤 Seeding users...');
      // Seed Admin User
      const admin = await this.userRepo.save(
        this.userRepo.create({
          email: 'admin@rse.rw',
          password: await bcrypt.hash('Admin@RSE2024!', 12),
          firstName: 'RSE',
          lastName: 'Administrator',
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
        }),
      );
      results.users++;

      // Seed Broker
      const brokerUser = await this.userRepo.save(
        this.userRepo.create({
          email: 'broker@rse.rw',
          password: await bcrypt.hash('Broker@RSE2024!', 12),
          firstName: 'John',
          lastName: 'Broker',
          role: UserRole.BROKER,
          status: UserStatus.ACTIVE,
        }),
      );
      results.users++;
      console.log(`✓ Created ${results.users} users`);

      console.log('🏢 Seeding brokers...');
      await this.brokerRepo.save(
        this.brokerRepo.create({
          userId: brokerUser.id,
          firmName: 'RSE Brokerage Ltd',
          licenseNumber: 'CMA/LB/001/2024',
          status: BrokerStatus.LICENSED,
          district: 'Kigali',
          commissionRate: 1.0,
          description: 'Leading brokerage firm in Rwanda',
          officeAddress: 'KG 11 Ave, Kigali',
          specializations: ['Equities', 'Bonds'],
          licenseExpiryDate: new Date('2026-12-31'),
          totalClients: 50,
          totalTrades: 200,
        }),
      );
      results.brokers++;
      console.log(`✓ Created ${results.brokers} brokers`);

      results.message = 'Database seeded successfully!';
      return results;
    } catch (error) {
      console.error('❌ Seed error:', error);
      throw error;
    }
  }
}
