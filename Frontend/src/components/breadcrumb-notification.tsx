import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useAuthUser } from "@/services/auth";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function NotificationsPopover() {
  const { user } = useAuthUser();

  const mustChangePassword = user?.mustChangePassword === true;

  return (
    <Popover>
      <PopoverTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="relative">
              <Bell size={24} />
              {mustChangePassword && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
      </PopoverTrigger>

      <PopoverContent className="w-64">
        <div className="flex items-center w-full justify-between">
          <h4 className="font-semibold mb-2">Notifications</h4>
          {mustChangePassword && (
            <Badge variant={"destructive"}>1</Badge>
          )}
        </div>

        {mustChangePassword ? (
          <div className="border text-sm p-3 rounded bg-red-50 text-red-700">
            Vous devez changer votre mot de passe.
          </div>
        ) : (
          <p className="text-sm text-gray-500">Aucune notification</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
