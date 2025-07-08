import { FacebookOutlined, SendOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const FooterLanding: React.FC = () => {
  return (
    <footer className="w-full py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 text-sm text-gray-600 md:mb-0">
            All Rights Reserved © 2025{" "}
            <span className="text-pink-600">
              {" "}
              {window.location.hostname.toUpperCase()}
            </span>
          </div>

          <div className="mb-4 flex space-x-6 md:mb-0">
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-use"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms Of Use
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookOutlined className="h-5 w-5 text-[#1877F2]" />
            </Link>
            <Link
              to="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <SendOutlined className="h-5 w-5 text-[#0088cc]" />
            </Link>
            <Link
              to="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
            >
              <div className="flex h-5 w-5 items-center justify-center text-[#0068ff]">
                <span className="text-xs font-bold">Zalo</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLanding;
