"use client";

import { useState } from "react";

import { CameraIcon, UserIcon, MailIcon, LockIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  cn,
} from "@nx-next-shadcn/shadcn";
import { Button } from "@nx-next-shadcn/shadcn";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@nx-next-shadcn/shadcn";
import { Input } from "@nx-next-shadcn/shadcn";
import { Label } from "@nx-next-shadcn/shadcn";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    image: "/placeholder.svg?height=200&width=200",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, image: imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated user data:", user);
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password change request:", passwords);

    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="bg-gray-50">
      <div>
        <Card className={cn("rounded-none border-none shadow-none")}>
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-end sm:space-x-4 sm:space-y-0">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 cursor-pointer"
                >
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <CameraIcon className="h-5 w-5" />
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                    id="profile-upload"
                    disabled={!isEditing}
                  />
                </Label>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">
                  {user.name}
                </CardTitle>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4" />
                    <span>Name</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center space-x-2"
                  >
                    <MailIcon className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-10">
              <h3 className="text-lg font-medium">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="oldPassword"
                    className="flex items-center space-x-2"
                  >
                    <LockIcon className="h-4 w-4" />
                    <span>Old Password</span>
                  </Label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="flex items-center space-x-2"
                  >
                    <LockIcon className="h-4 w-4" />
                    <span>New Password</span>
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="flex items-center space-x-2"
                  >
                    <LockIcon className="h-4 w-4" />
                    <span>Confirm New Password</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Change Password</Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
