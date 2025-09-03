# Healthcare Dashboard Setup Guide

This guide will help you set up the new healthcare dashboard with real database data for your Exponential AI Tech platform.

## Overview

The healthcare dashboard replaces the system monitoring dashboard with real healthcare data including:
- Patient management
- Referral tracking
- Service utilization
- Insurance and payer information
- Clinical data (diagnoses, medications, disciplines)

## Prerequisites

- Node.js 18+ and pnpm installed
- PostgreSQL database running
- Environment variables configured

## Database Setup

### 1. Environment Variables

Make sure you have a `.env` file with your database connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
```

### 2. Database Schema

The Prisma schema is already configured with healthcare entities:

- **Organizations**: Healthcare providers
- **Users**: Staff members (doctors, nurses, coordinators)
- **Patients**: Patient demographics and contact info
- **Referrals**: Patient care referrals with clinical data
- **Services**: Available medical services (catheter, wound care, etc.)
- **Payers**: Insurance companies
- **Plans**: Insurance plans and coverage
- **Diagnoses**: Medical diagnosis codes
- **Medications**: Prescription medications
- **Disciplines**: Clinical disciplines (SN, PT, OT, SLP)

### 3. Database Migration

Run the database migration to create all tables:

```bash
pnpm db:push
```

### 4. Seed the Database

Populate the database with realistic healthcare data:

```bash
pnpm db:seed
```

This will create:
- 2 healthcare organizations
- 3 staff users
- 3 sample patients with complete profiles
- 6 medical services
- 4 insurance payers
- 3 insurance plans
- 4 clinical disciplines
- 4 diagnosis codes
- 3 medications
- 3 referrals with full clinical data

## Dashboard Features

### System Dashboard (`/dashboard`)
- Original system monitoring interface
- CPU, memory, network monitoring
- System alerts and communications
- Now includes link to healthcare dashboard

### Healthcare Dashboard (`/dashboard/healthcare`)
- **Key Metrics**: Total patients, active referrals, services
- **Recent Referrals**: Latest patient referrals with clinical details
- **Service Utilization**: Service usage statistics
- **Patient Search**: Real-time patient lookup
- **Quick Actions**: Add patients, create referrals, export data

## API Endpoints

The dashboard uses these API endpoints:

- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/patients` - Patient list
- `GET /api/dashboard/analytics` - Referral analytics

## Data Structure

### Sample Patient Data

**Margaret Johnson (78 years old)**
- Primary Diagnosis: Essential hypertension
- NTA Score: Medium
- Services: Catheter care, wound care
- Insurance: Humana HMO
- Emergency Contact: Thomas Johnson (Son)

**Robert Williams (71 years old)**
- Primary Diagnosis: Type 2 diabetes
- NTA Score: High
- Services: IV fluid therapy
- Insurance: Aetna PPO
- Emergency Contact: Jennifer Williams (Daughter)

**Dorothy Davis (85 years old)**
- Primary Diagnosis: Pressure ulcer
- NTA Score: Low
- Services: Wound vacuum therapy
- Insurance: Blue Cross Supplement
- Emergency Contact: James Davis (Son)

## Usage

### 1. Access the Dashboard

Navigate to `/dashboard/healthcare` to view the healthcare dashboard.

### 2. View Statistics

The dashboard displays real-time statistics from your database:
- Total patient count
- Active referrals (last 30 days)
- Service utilization rates
- Recent referral activity

### 3. Search Patients

Use the search bar to find patients by:
- Name
- Diagnosis
- Location (city/state)

### 4. View Referral Details

Click on recent referrals to see:
- Patient information
- Primary diagnosis
- NTA score
- Required services
- Insurance details

### 5. Monitor Service Usage

Track which services are most commonly used:
- Catheter care
- Wound care
- IV therapy
- Ostomy care
- Drain management

## Customization

### Adding New Services

1. Update the seed file (`prisma/seed.ts`)
2. Add new service entries
3. Re-run the seed command

### Modifying Patient Data

1. Edit the seed file
2. Update patient demographics
3. Modify referral information
4. Re-seed the database

### Adding New Organizations

1. Update the seed file
2. Add organization details
3. Create associated users
4. Re-run seeding

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL in .env
- Check PostgreSQL is running
- Ensure database exists

### Seed Failures

- Check for duplicate data (use upsert)
- Verify foreign key relationships
- Check console for specific error messages

### Dashboard Not Loading

- Verify API endpoints are accessible
- Check browser console for errors
- Ensure database has been seeded

## Next Steps

### Production Considerations

1. **Data Security**: Implement proper authentication and authorization
2. **Data Validation**: Add input validation for new entries
3. **Audit Logging**: Track data changes and access
4. **Backup Strategy**: Regular database backups
5. **Performance**: Add database indexes for large datasets

### Feature Enhancements

1. **Patient Forms**: Add/edit patient information
2. **Referral Management**: Create and track referrals
3. **Reporting**: Generate clinical and financial reports
4. **Integration**: Connect with EMR systems
5. **Mobile**: Responsive design for mobile devices

### Compliance

1. **HIPAA**: Ensure patient data privacy
2. **Documentation**: Maintain audit trails
3. **Access Control**: Role-based permissions
4. **Data Encryption**: Secure data transmission

## Support

For issues or questions:
1. Check the console logs for error messages
2. Verify database connectivity
3. Ensure all dependencies are installed
4. Review the Prisma schema for data relationships

The healthcare dashboard provides a solid foundation for managing post-acute care operations with real data and can be extended based on your specific clinical and business needs.
