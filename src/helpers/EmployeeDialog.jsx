import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useConfigurationsStore } from "@/store/store";
import toast from "react-hot-toast";
import axios from "axios";

const EmployeeDialog = ({ triggerText, employee, onSave, className }) => {
  const { configurations } = useConfigurationsStore((state) => ({
    configurations: state.configurations,
  }));

  const [formData, setFormData] = React.useState({
    name: employee?.name || "",
    salary: employee?.salary || "",
    departmentName: employee?.departmentName || "",
    gender: employee?.gender || "",
    jobRole: employee?.jobRole || "",
    contactInfo: employee?.contactInfo || "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (employee) {
        const editData = {
          ...formData,
          userID: employee._id,
        };
        await axios.put(`/api/auth/employee`, editData);
        toast.success("Employee updated successfully");
      } else {
        await axios.post("/api/auth/employee", formData);
        toast.success("Employee added successfully");
      }
      onSave();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setFormData({
        name: employee?.name || "",
        salary: employee?.salary || "",
        departmentName: employee?.departmentName || "",
        gender: employee?.gender || "",
        jobRole: employee?.jobRole || "",
        contactInfo: employee?.contactInfo || "",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={className}>{triggerText}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {employee ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {employee
              ? "Edit the details of the employee"
              : "Add an employee to your organization"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactInfo" className="text-right">
              Contact Info
            </Label>
            <Input
              id="contactInfo"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactInfo: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right text-gray-700">
              Gender
            </Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <div className="col-span-3 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="r1" />
                  <Label htmlFor="r1" className="text-gray-700">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="r2" />
                  <Label htmlFor="r2" className="text-gray-700">
                    Male
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right text-gray-700">
              Department
            </Label>
            <Select
              value={formData.departmentName}
              onValueChange={(value) =>
                setFormData({ ...formData, departmentName: value })
              }
            >
              <SelectTrigger className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {configurations.departments?.map((department) => (
                    <SelectItem key={department._id} value={department._id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right text-gray-700">
              Salary
            </Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobRole" className="text-right text-gray-700">
              Job Role
            </Label>
            <Select
              value={formData.jobRole}
              onValueChange={(value) =>
                setFormData({ ...formData, jobRole: value })
              }
            >
              <SelectTrigger className="col-span-3 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {configurations.jobs?.map((job) => (
                    <SelectItem key={job._id} value={job._id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <Button
            type="submit"
            onClick={handleSave}
            className="bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDialog;
