import connectDB from "@/db/connectDB";
import Employee from "@/models/employee.model";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
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

export async function PUT(request) {
  try {
    await connectDB();
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

    const { userID, ...updateFields } = await request.json();

    if (!userID) {
      return NextResponse.json(
        { message: "Employee ID is required" },
        { status: 400 }
      );
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      userID,
      updateFields,
      { new: true }
    );

    if (!updatedEmployee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Employee updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating employee", error },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
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

    const { userID } = await request.json();

    if (!userID) {
      return NextResponse.json(
        { message: "Employee ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await Employee.findByIdAndDelete(userID);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Employee Deleted successfully!", deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting employee", error },
      { status: 400 }
    );
  }
}
