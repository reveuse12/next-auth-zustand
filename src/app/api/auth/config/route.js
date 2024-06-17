import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import Department from "@/models/department.model";
import Job from "@/models/job.model";
import connectDB from "@/db/connectDB";

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

    //get all departments and job
    const [departments, jobs] = await Promise.all([
      Department.find({}, { _id: 1, name: 1 }),
      Job.find({}, { _id: 1, title: 1 }),
    ]);

    return NextResponse.json({ jobs, departments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const { departmentName, departmentDescription, jobRole, jobDescription } =
      await request.json();

    if (
      !departmentName ||
      !departmentDescription ||
      !jobRole ||
      !jobDescription
    ) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    // Create new department and job
    const newDepartment = new Department({
      name: departmentName,
      description: departmentDescription,
    });

    const newJobRole = new Job({
      title: jobRole,
      description: jobDescription,
    });

    await Promise.all([newDepartment.save(), newJobRole.save()]);

    return NextResponse.json(
      { message: "Configuration Added Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
