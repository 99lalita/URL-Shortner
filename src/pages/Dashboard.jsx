import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import Error from "@/components/Error";
import useFetch from "@/hooks/use-fetch";
import { getURLs } from "@/db/apiURLS";
import { UrlState } from "@/Context";
import { getClicksForURLs } from "@/db/apiClicks";
import LinkCrad from "@/components/LinkCrad";
import { CreateLink } from "@/components/createLink";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    data: urls,
    error,
    loading,
    fn: fnUrls,
  } = useFetch(getURLs, user?.id);

  const {
    data: clicks,

    loading: loadingClicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForURLs,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-8">
      {loading ||
        (loadingClicks && <BarLoader width={"100%"} color={"#36d7b7"} />)}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChnage={(e) => setSearchQuery(e.target.value)}
        />

        <FilterIcon className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}

      {(filteredUrls || []).map((url, i) => {
        return <LinkCrad key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default Dashboard;