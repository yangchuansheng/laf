import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import CopyText from "@/components/CopyText";
// import CopyText from "@/components/CopyText";
import FileTypeIcon, { FileType } from "@/components/FileTypeIcon";
import IconWrap from "@/components/IconWrap";
import MoreButton from "@/components/MoreButton";
import Panel from "@/components/Panel";
import SectionList from "@/components/SectionList";

import CreateCollectionModal from "../mods/CreateCollectionModal";
import DeleteCollectionModal from "../mods/DeleteCollectionModal";
import { useCollectionListQuery } from "../service";
import useDBMStore from "../store";

export default function CollectionListPanel() {
  const store = useDBMStore((store) => store);
  const { t } = useTranslation();
  const collectionListQuery = useCollectionListQuery({
    onSuccess: (data) => {
      if (data.data.length > 0) {
        store.setCurrentDB(data.data[0]);
      } else {
        store.setCurrentDB(undefined);
      }
    },
  });

  const [search, setSearch] = useState("");

  return (
    <Panel
      className="flex-grow overflow-hidden"
      onClick={() => {
        store.setCurrentShow("DB");
      }}
    >
      <Panel.Header
        title={t("CollectionPanel.CollectionList").toString()}
        actions={[
          <CreateCollectionModal key={"create_database"}>
            <IconWrap tooltip={t("CollectionPanel.AddCollection").toString()} size={20}>
              <AddIcon fontSize={10} />
            </IconWrap>
          </CreateCollectionModal>,
        ]}
      />
      <div className="flex items-center mb-3 w-full">
        <InputGroup>
          <InputLeftElement
            height={"8"}
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            rounded={"full"}
            placeholder={t("CollectionPanel.Search").toString()}
            size="sm"
            bg={"gray.100"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>

      <SectionList style={{ overflowY: "auto", flexGrow: 1 }}>
        {(collectionListQuery?.data?.data || [])
          .filter((db: any) => db.name.indexOf(search) >= 0)
          .map((db: any) => {
            return (
              <SectionList.Item
                isActive={store.currentShow === "DB" && db.name === store.currentDB?.name}
                key={db.name}
                onClick={() => {
                  store.setCurrentDB(db);
                }}
              >
                <div className="w-full flex justify-between group">
                  <div className="leading-loose">
                    <FileTypeIcon type={FileType.db} />
                    <span className="ml-2 text-base">{db.name}</span>
                  </div>
                  <MoreButton
                    isHidden={db.name !== store.currentDB?.name || store.currentShow !== "DB"}
                  >
                    <>
                      <div className="text-grayIron-600">
                        <div className="text-grayModern-900 w-[20px] h-[20px] text-center">
                          <CopyText
                            hideToolTip
                            text={db.name}
                            className="w-[28px]"
                            tip="名称复制成功"
                          />
                        </div>
                        {t("Copy")}
                      </div>
                      <div className="text-grayIron-600">
                        <DeleteCollectionModal database={db} />
                        {t("Delete")}
                      </div>
                    </>
                  </MoreButton>
                </div>
              </SectionList.Item>
            );
          })}
      </SectionList>
    </Panel>
  );
}
