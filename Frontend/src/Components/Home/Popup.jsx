import React from "react";
import {
  Dialog,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/img/eventhub-logo.png";

const PopupModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} handler={handleClose}>
      <div className="flex justify-end p-2">
        <IconButton variant="text" color="red" onClick={handleClose}>
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>
      <DialogBody divider className="text-center">
        <img src={logo} alt="eventhub" className="h-16 mx-auto" />
        <Typography color="blue-gray" className="mb-6 mt-10" variant="h4">
          Welcome to our project!
        </Typography>
        <Typography className="text-[24px] font-normal text-[#F76B1A] mb-12">
          This is a demonstration project and not a real website. All content is
          for demonstration purposes only.
        </Typography>
      </DialogBody>
    </Dialog>
  );
};

export default PopupModal;
