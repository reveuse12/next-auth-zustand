import connectDB from "@/db/connectDB";
import Employee from "@/models/employee.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const {
      name,
      gender,
      departmentName,
      jobRole,
      contactInfo,
      salary,
      leaves,
      performanceReview,
    } = await request.json();

    const newEmployee = new Employee({
      name,
      gender,
      departmentName,
      jobRole,
      contactInfo,
      salary,
      leaves,
      performanceReview,
    });

    console.log(newEmployee, "added-employee");
    await newEmployee.save();

    return NextResponse.json(
      { message: "Employee added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding employee", error },
      { status: 400 }
    );
  }
}
