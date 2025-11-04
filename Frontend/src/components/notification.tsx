import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";

type AlertType = "error" | "success" | "info";

export interface NotificationType {
  message: string;
  type: AlertType;
  duration?: number;
}

export default function Notification({
  type,
  message,
  duration = 3500,
}: NotificationType) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Alert
            variant={
              type === "error"
                ? "destructive"
                : type === "success"
                  ? "success"
                  : "default"
            }
            className={"flex items-center gap-2 shadow-lg w-fit max-w-md"}
          >
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}