import { ViewProps } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { UserAccordition } from "./UserAccordition";

interface DashboardHeaderProps extends ViewProps {
}
export function DashboardHeader(props: DashboardHeaderProps) {
    return (
        <HStack {...props} className='items-center justify-between top-8 m-4 h-fit z-50 p-4'>
            <UserAccordition />
            <Menu
                placement="bottom right"
                offset={4}
                trigger={({ ...triggerProps }) => {
                    return (
                        <Button {...triggerProps} size="lg" className="items-center p-3 bg-background-900/25">
                            <Ionicons name="menu" size={24} color="white" />
                        </Button>
                    )
                }}
            >
                <MenuItem key="Community" textValue="Community">
                    <MenuItemLabel size="sm">Community</MenuItemLabel>
                </MenuItem>
                <MenuItem key="Plugins" textValue="Plugins">
                    <MenuItemLabel size="sm">Plugins</MenuItemLabel>
                </MenuItem>
                <MenuItem key="Settings" textValue="Settings">
                    <MenuItemLabel size="sm">Settings</MenuItemLabel>
                </MenuItem>
            </Menu>
        </HStack>
    )
}