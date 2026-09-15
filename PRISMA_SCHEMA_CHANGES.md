// ============================================================
// STEP 1: Update your prisma/schema.prisma file
// ============================================================
//
// Find your existing "model User {" block and add ONE line
// inside it — emailVerified — like this:

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  phone        String?
  role         Role     @default(CUSTOMER)
  emailVerified DateTime?          // <-- ADD THIS LINE
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  orders       Order[]
  repairs      Repair[]       @relation("CustomerRepairs")
  assignedRepairs Repair[]    @relation("TechnicianRepairs")
  appointments Appointment[]
  reviews      Review[]
  messages     Message[]
  blogPosts    BlogPost[]
}

// Then ADD this whole new model anywhere below it (e.g. right
// after the User model, or at the end of the file):

model EmailOTP {
  id        String   @id @default(cuid())
  email     String
  code      String
  expiresAt DateTime
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([email])
}

// ============================================================
// STEP 2: After saving, run these in your terminal:
// ============================================================
//
//   npx prisma migrate dev --name add_email_otp
//
// This creates the new database table and adds the
// emailVerified column to your existing users table.
