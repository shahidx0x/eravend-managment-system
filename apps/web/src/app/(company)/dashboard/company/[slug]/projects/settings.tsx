/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nx-next-shadcn/shadcn";

export function SettingsTab() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    language: "English",
    theme: "Light",
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  //@ts-ignorew
  const handleSettingChange = (setting, value) => {
    setSettings({ ...settings, [setting]: value });
  };

  const handleChangePassword = () => {
    // Here you would typically send a request to your backend to change the password
    console.log("Password changed to:", newPassword);
    setNewPassword("");
    setIsChangingPassword(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your application settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Integrations</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Google Calendar</span>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Slack</span>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>GitHub</span>
                <Button variant="outline" size="sm">
                  Connected
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
