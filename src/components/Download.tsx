import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, ClipboardIcon, Download, View } from "lucide-react";
import Link from "next/link";

export function DownloadImageComponent(props: {
  url: string;
  isBase64?: boolean;
  src: string;
  name?: string;
}): React.ReactNode {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  async function toDataURL(url: string) {
    const blob = await fetch(url).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }

  // hacky way to download image
  const download = async (url: string) => {
    const a = document.createElement("a");
    if (!props.isBase64) {
      a.href = await toDataURL(url);
      a.download = `${url.split("/")[3]}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      a.href = props.src;
      a.download = props.name!;
      a.click();
    }
  };

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
  }

  const copy = useCallback((value: string) => {
    copyToClipboard(value);
    setHasCopied(true);
  }, []);

  return (
    <div className="flex justify-around">
      <Button variant="outline" onClick={() => download(props.url)}>
        <Download size="18" />
      </Button>
      {!props.isBase64 && (
        <>
          <Link href={props.url} rel="noopener noreferrer" target="_blank">
            <Button variant="outline">
              <View size="18" />
            </Button>
          </Link>
          <Button variant="outline" onClick={() => copy(props.url)}>
            {hasCopied ? <CheckIcon size="18" /> : <ClipboardIcon size="18" />}
          </Button>
        </>
      )}
    </div>
  );
}
