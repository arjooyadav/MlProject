"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Brain, TrendingUp, Home, ShoppingCart, User, Bell, LogOut, Settings, Menu, X } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout?: () => void
}

export default function Navigation({ activeTab, setActiveTab, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("stocKera_user") || "{}") : {}

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setIsMobileMenuOpen(false) // Close mobile menu when tab is selected
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">stocKera</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>

            <Button
              variant={activeTab === "ai-tools" ? "default" : "ghost"}
              onClick={() => setActiveTab("ai-tools")}
              className="flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>AI Tools</span>
              <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-700">
                New
              </Badge>
            </Button>

            <Button
              variant={activeTab === "trading" ? "default" : "ghost"}
              onClick={() => setActiveTab("trading")}
              className="flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Trading</span>
            </Button>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{user.email?.split("@")[0] || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="p-2">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Items */}
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                onClick={() => handleTabChange("dashboard")}
                className="w-full justify-start flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>

              <Button
                variant={activeTab === "ai-tools" ? "default" : "ghost"}
                onClick={() => handleTabChange("ai-tools")}
                className="w-full justify-start flex items-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>AI Tools</span>
                <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700">
                  New
                </Badge>
              </Button>

              <Button
                variant={activeTab === "trading" ? "default" : "ghost"}
                onClick={() => handleTabChange("trading")}
                className="w-full justify-start flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Trading</span>
              </Button>

              {/* Mobile User Menu */}
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{user.email?.split("@")[0] || "User"}</span>
                  </div>

                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>

                    <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onLogout}
                      className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
