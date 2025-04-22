"use client";
import { useSession } from "@/hook/useSession";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const BugReport = () => {
  const [bug, setBug] = useState<any>([]);
  const session = useSession();
  const user = session;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/bug_report`);
      const data = await response.json();
      setBug(data);
    })();
  }, []);

  const MapBug = bug?.map((bug: any) => {
    return (
      <>
        <Box
          w={"100%"}
          borderRadius={"15px"}
          bg={"yellowgreen"}
          textAlign={"center"}
        >
          {bug.descricao}
          {/* {user?.hierarquia === "ADM" && <p> - {bug.createdAt}</p>} */}
        </Box>
      </>
    );
  });

  return <>{MapBug}</>;
};
