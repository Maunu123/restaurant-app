import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import foodModel from "../models/foodModel.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendDirectory = path.resolve(scriptDirectory, "..");
const sourceDirectory = path.resolve(
    backendDirectory,
    "../frontend/src/assets"
);
const uploadsDirectory = path.resolve(backendDirectory, "uploads");

const names = [
    "Greek salad",
    "Veg salad",
    "Clover Salad",
    "Chicken Salad",
    "Lasagna Rolls",
    "Peri Peri Rolls",
    "Chicken Rolls",
    "Veg Rolls",
    "Ripple Ice Cream",
    "Fruit Ice Cream",
    "Jar Ice Cream",
    "Vanilla Ice Cream",
    "Chicken Sandwich",
    "Vegan Sandwich",
    "Grilled Sandwich",
    "Bread Sandwich",
    "Cup Cake",
    "Vegan Cake",
    "Butterscotch Cake",
    "Sliced Cake",
    "Garlic Mushroom",
    "Fried Cauliflower",
    "Mix Veg Pulao",
    "Rice Zucchini",
    "Cheese Pasta",
    "Tomato Pasta",
    "Creamy Pasta",
    "Chicken Pasta",
    "Buttter Noodles",
    "Veg Noodles",
    "Somen Noodles",
    "Cooked Noodles",
];

const prices = [12, 18, 16, 24, 14, 12, 20, 15];
const categories = [
    "Salad",
    "Rolls",
    "Deserts",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
];
const description =
    "Food provides essential nutrients for overall health and well-being";
const uploadTimestamp = Date.now();

const foods = names.map((name, index) => ({
    name,
    image: `${uploadTimestamp + index}food_${index + 1}.png`,
    price: prices[index % 8],
    description,
    category: categories[Math.floor(index / 4)],
}));

async function copyImages() {
    await fs.mkdir(uploadsDirectory, { recursive: true });

    await Promise.all(
        foods.map((food, index) =>
            fs.copyFile(
                path.join(sourceDirectory, `food_${index + 1}.png`),
                path.join(uploadsDirectory, food.image)
            )
        )
    );
}

async function seedFood() {
    try {
        await copyImages();
        await connectDB();

        const result = await foodModel.bulkWrite(
            foods.map((food) => ({
                updateOne: {
                    filter: { name: food.name, category: food.category },
                    update: { $set: food },
                    upsert: true,
                },
            }))
        );

        console.log(
            `Seed complete: ${result.upsertedCount} inserted, ${result.modifiedCount} updated.`
        );
    } catch (error) {
        console.error("Food seed failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

await seedFood();
