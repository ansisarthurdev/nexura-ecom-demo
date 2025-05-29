import React from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const Alert = ({
  open,
  onOpenChange,
  title = "Success",
  description,
  actionLabel = "OK",
  showCancel = false,
  onAction,
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px" className="rounded-md">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          {description}
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          {showCancel && (
            <AlertDialog.Cancel>
              <Button
                variant="primary"
                color="gray"
                radius="medium"
                className="bg-gray-800"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
          )}
          <AlertDialog.Action>
            <Button
              variant="primary"
              color="gray"
              radius="medium"
              className="bg-gray-800"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Alert;
