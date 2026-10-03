import { prisma } from "../lib/prisma";

const adminData = {
    name: 'Admin User',
    email: 'example@gmail.com',
    password: 'adminpassword',
    image: 'https://example.com/image.png',
    role: 'ADMIN',
};

const seedAdmin = async () => {
    try {
        const admin = await prisma.user.findUnique({
            where: { email: adminData.email },
        });

        if (admin) {
            console.log('Admin user already exists');
            return
        }

        const newAdmin = await fetch("http://localhost:3000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:3000",
            },
            body: JSON.stringify(adminData),
        });

        
        // console.log( newAdmin);
        if (newAdmin.ok) {
            
            const res = await prisma.user.update(
                {
                    where: { email: adminData.email },
                    data: {emailVerified: true}
                }
            )

            console.log('Admin user seeded successfully');
            console.log(res);
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
}

seedAdmin();