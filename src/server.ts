import app from "./app";
import { prisma } from "./lib/prisma";


const PORT = process.env.PORT || 3000;

const main = async () => {
    try {
        await prisma.$connect();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        
        console.log("Connected to the database successfully.");
    } catch (error) {
        prisma.$disconnect();
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}


main();