import React, { useEffect, useRef } from "react";

const AutoSendFormTbk = ({url,token}) => {
  const formRef = useRef(null);
  useEffect(() => {
    if(url && token){
      formRef.current.submit();
    }
  }, [url, token]);

  return (
    <form ref={formRef} method="POST" action={url}>
      <input type="hidden" name="token_ws" value={token}/>
    </form>
  );
};

export default AutoSendFormTbk;

