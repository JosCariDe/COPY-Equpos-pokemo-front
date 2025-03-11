"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../buttons/General";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    cancelText?: string;
    onCancel?: () => void;
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    confirmText,
    onConfirm,
    cancelText,
    onCancel,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            setIsMounted(true);
        } else {
            setTimeout(() => setIsMounted(false), 300);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-[#00000072] bg-opacity-50 backdrop-blur-sm z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        ref={modalRef}
                        className="min-w-[400px] max-w-[95vw] p-6 rounded-lg shadow-lg"
                        style={{
                            background: "var(--background, white)",
                            color: "var(--foreground, black)",
                        }}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <h2 className="text-xl font-semibold mb-4">{title}</h2>

                        <div className="mb-4">{children}</div>

                        <div className="flex justify-end space-x-2">
                            {cancelText && onCancel && (
                                <Button className="bg-gray-400 text-black hover:bg-gray-500" onClick={onCancel}>
                                    {cancelText}
                                </Button>
                            )}
                            {confirmText && onConfirm && (
                                <Button className="bg-blue-600 hover:bg-blue-700" onClick={onConfirm}>
                                    {confirmText}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
