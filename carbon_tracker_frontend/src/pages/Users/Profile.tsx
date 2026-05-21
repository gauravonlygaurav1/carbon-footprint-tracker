import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, User, CheckCircle, Calendar } from "lucide-react"
import useAuth from "@/Auth/store"

function Profile() {

  const authUser = useAuth((state) => state.user)

  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enabled: true,
    createdAt: ""
  })

  // ✅ Sync user data
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || "",
        email: authUser.email || "",
        enabled: authUser.enabled || true,
        createdAt: authUser.createdAt || ""
      })
    }
  }, [authUser])

  const handleSave = () => {
    console.log("Updated:", formData)

    // 👉 later API call
    // await apiClient.put("/user/update", formData)

    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex justify-center p-6">

      <div className="w-full max-w-2xl">

        {/* COVER */}
        <div className="h-32 bg-green-300 rounded-t-2xl"></div>

        {/* CARD */}
        <Card className="relative -mt-16 rounded-3xl 
         bg-white/45 backdrop-blur-md 
          border border-green-100 
          shadow-xl hover:shadow-2xl 
          transition-all duration-300 
          hover:-translate-y-1"
>
  <CardContent className="p-8">

            {/* Avatar */}
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                <AvatarFallback className="text-2xl">
                  {formData.name ? formData.name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-semibold mt-3">
                {formData.name || "User"}
              </h2>

              <p className="text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {formData.email}
              </p>
            </div>

            {/* EDIT BUTTON */}
            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  if (isEditing) handleSave()
                  else setIsEditing(true)
                }}
              >
                {isEditing ? "Save" : "Edit Profile"}
              </Button>
            </div>

            {/* INFO */}
            <div className="mt-6 space-y-4">

              {/* NAME */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" /> Name
                </label>

                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="font-medium">{formData.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <p className="font-medium">{formData.email}</p>
              </div>

              {/* ENABLED STATUS */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Account Status
                </label>

                <p className={`font-medium ${formData.enabled ? "text-green-600" : "text-red-500"}`}>
                  {formData.enabled ? "Active" : "Disabled"}
                </p>
              </div>

              {/* CREATED AT */}
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Joined On
                </label>

                <p className="font-medium">
                  {formData.createdAt
                    ? new Date(formData.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Profile