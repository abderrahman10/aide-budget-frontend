import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import aideBudget from "@/assets/Image_budget.png";

import Image from "next/image";
import Link from "next/link";

export default function Cards({ slug }: { slug: string }) {
  const token = slug;

  const header = <Image src={aideBudget} alt="Card" />;
  const footer = (
    <>
    <div className="card flex justify-content-center">
            <Link href={`/user-consentement/${token}`}>
        <Button  label="donne mon accord" icon="pi pi-check" />
      </Link>  
        </div>
  
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        footer={footer}
        header={header}
        className="md:w-100%"
      >
        <h2 className="m-0">
          Pour bénéficier d&apos;un accompagnement aide budget, rien de plus
          simple, il vous suffit de donner votre accord en cliquant sur le
          bouton ci-dessous :
        </h2>
      </Card>
    </div>
  );
}
