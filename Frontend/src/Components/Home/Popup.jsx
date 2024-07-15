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
        <Typography color="blue-gray" className="mb-2 mt-2" variant="h5">
          Welcome to our project!
        </Typography>
        <Typography className="text-[14px] font-normal text-[#F76B1A] mb-2">
          This is a demonstration project and not a real website. All content is
          for demonstration purposes only.
        </Typography>
        <Typography className="text-[14px] font-normal text-[#F76B1A] mb-4">
          Since the server service is free, the page does not load immediately.
          We recommend refreshing the page or waiting 5-10 seconds to fully view
          the site.
        </Typography>
        <Typography color="blue-gray" className="mb-2 mt-4" variant="h5">
          Willkommen zu unserem Projekt!
        </Typography>
        <Typography className="text-[14px] font-normal text-[#F76B1A] mb-2">
          Dies ist ein Demonstrationsprojekt und keine echte Website. Alle
          Inhalte dienen nur zu Demonstrationszwecken.
        </Typography>
        <Typography className="text-[14px] font-normal text-[#F76B1A] mb-12">
          Da der Serverdienst kostenlos ist, lädt die Seite nicht sofort. Wir
          empfehlen, die Seite zu aktualisieren oder 5-10 Sekunden zu warten, um
          die Website vollständig zu sehen.
        </Typography>
      </DialogBody>
    </Dialog>
  );
};

export default PopupModal;
