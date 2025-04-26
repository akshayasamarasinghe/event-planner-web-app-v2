// components/StatusModal.tsx
import {Modal, Text, Title} from '@mantine/core';
import {AlertCircle, CheckCircle} from 'lucide-react';

interface StatusModalProps {
    opened: boolean;
    onClose: () => void;
    type: 'success' | 'error';
    message: string;
}

const ActionMessage = ({opened, onClose, type, message}: StatusModalProps) => {
    const isSuccess = type === 'success';

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            withCloseButton={false}
            overlayProps={{opacity: 0.55, blur: 20}}
            m="xl"
            size="md"
        >
            <div className="text-center m-3 h-40">
                {isSuccess ? (
                    <CheckCircle size={50} className="text-green-500 mx-auto mb-4"/>
                ) : (
                    <AlertCircle size={50} className="text-red-500 mx-auto mb-4"/>
                )}
                <Title order={3}>{isSuccess ? 'Success' : 'Error'}</Title>
                <Text mt="sm">{message}</Text>
            </div>
        </Modal>
    );
}

export default ActionMessage;
