import { useEffect, useRef } from "react";
import { TableResult } from "./TableResult";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ACTION_TYPE } from "../actions/guessAction";
import { useSelector, useDispatch } from "react-redux";

export const ListResultTable = () => {
  const historyResults = useSelector((state) => state.historyResults);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const containerRef = useRef(null);

  const onEmptyResult = () => {
    dispatch({
      type: ACTION_TYPE.DELETE_LIST,
    });
  };

  useEffect(() => {
    const componentWidth = window.innerWidth - 32;
    const down = (e) => {
      if (e.key === "ArrowLeft") {
        containerRef.current.scrollLeft -= componentWidth;

        return;
      }
      if (e.key === "ArrowRight") {
        containerRef.current.scrollLeft += componentWidth;
        return;
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative scroll-smooth mt-4 hover:overflow-x-auto overflow-hidden flex scrollbar scrollbar-h-1 scrollbar-w-1 scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-600"
      >
        {historyResults && historyResults?.length > 0 && (
          <Button
            color="primary"
            className=" fixed right-4 z-10 hover:text-red-500 opacity-70"
            isIconOnly
            aria-label="Delete"
            onPress={onOpen}
          >
            <DeleteIcon />
          </Button>
        )}
        {(historyResults || []).map((data, index) => (
          <TableResult
            key={index}
            data={data}
            playTimes={Number(historyResults?.length || 0) - Number(index)}
            totalTimes={Number(historyResults?.length || 0)}
          />
        ))}

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top"
          className="text-foreground"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Xóa tất cả lịch sử trò chơi!
                </ModalHeader>
                <ModalBody>
                  <p>
                    Bạn chắc chắn chứ? Bạn sẽ không thể giữ lại lịch sử chơi
                    trong quá khứ sau khi bấm xoá.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    className="font-semibold"
                    onPress={onClose}
                  >
                    Giữ lại
                  </Button>
                  <Button
                    color="danger"
                    className="font-semibold"
                    onPress={() => {
                      onEmptyResult();
                      onClose();
                    }}
                  >
                    Xóa luôn
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
