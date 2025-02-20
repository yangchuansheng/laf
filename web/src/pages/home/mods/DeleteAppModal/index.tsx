import React from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { SubscriptionControllerRemove } from "@/apis/v1/subscriptions";

function DeleteAppModal(props: {
  item: any;
  children: React.ReactElement;
  onSuccess?: () => void;
}) {
  const { item, onSuccess } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    appid: string;
  }>();

  const deleteSubscriptionMutation = useMutation(
    (params: any) => SubscriptionControllerRemove(params),
    {
      onSuccess: () => {
        onSuccess && onSuccess();
      },
      onError: () => {},
    },
  );

  return (
    <>
      {React.cloneElement(props.children, {
        onClick: (event: any) => {
          event?.preventDefault();
          onOpen();
        },
      })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("HomePanel.DeleteApp")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p className="text-lg leading-relaxed">
              <Trans
                t={t}
                i18nKey="HomePanel.DeleteTip"
                values={{
                  appId: item.appid,
                }}
                components={{
                  span: <span className="text-danger" />,
                }}
              />
            </p>
            <FormControl mt="4" isRequired>
              <Input
                {...register("appid", {
                  required: "appid is required",
                })}
                id="name"
                placeholder={item.appid}
                variant="filled"
              />
              <FormErrorMessage>{errors.appid && errors.appid.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={deleteSubscriptionMutation.isLoading}
              colorScheme="red"
              onClick={handleSubmit(async (data) => {
                if (item.appid === data.appid) {
                  await deleteSubscriptionMutation.mutateAsync({
                    id: item.subscription.id,
                  });
                  onSuccess && onSuccess();
                  onClose();
                }
              })}
            >
              {t("Confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteAppModal;
