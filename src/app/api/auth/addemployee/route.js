import connectDB from "@/db/connectDB";
import Employee from "@/models/employee.model";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "You are not logged in" },
        { status: 400 }
      );
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken.isAdmin) {
      return NextResponse.json(
        { message: "You are not Admin" },
        { status: 200 }
      );
    }

    const employees = await Employee.find({})
      .populate("departmentName", "name")
      .populate("jobRole", "title");

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching employees", error },
      { status: 400 }
    );
  }
}

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
