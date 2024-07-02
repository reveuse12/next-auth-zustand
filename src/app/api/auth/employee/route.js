import Employee from "@/models/employee.model";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/helpers/decodeToken";

export async function GET(request) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (adminCheck.error) {
      return NextResponse.json(
        { message: adminCheck.error },
        { status: adminCheck.status }
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
    const adminCheck = await verifyAdmin(request);
    if (adminCheck.error) {
      return NextResponse.json(
        { message: adminCheck.error },
        { status: adminCheck.status }
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
    const adminCheck = await verifyAdmin(request);
    if (adminCheck.error) {
      return NextResponse.json(
        { message: adminCheck.error },
        { status: adminCheck.status }
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
    const adminCheck = await verifyAdmin(request);
    if (adminCheck.error) {
      return NextResponse.json(
        { message: adminCheck.error },
        { status: adminCheck.status }
      );
    }

    const { userID } = await request.json();
    if (!userID) {
      return NextResponse.json(
        { message: "Employee ID is required" },
        { status: 400 }
      );
    }

    const deletedEmployee = await Employee.findByIdAndDelete(userID);
    if (!deletedEmployee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Employee deleted successfully!", deletedEmployee },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting employee", error },
      { status: 400 }
    );
  }
}
