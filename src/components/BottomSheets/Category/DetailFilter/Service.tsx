"use client";

import { type ChangeEventHandler, type Dispatch, Fragment, type SetStateAction } from "react";

import { xor } from "lodash-es";

import type { ServiceTitle } from "@/common/types/service";
import { useSuspenseQuery } from "@/hooks";
import { getServiceTitlesApi } from "@/services/service";
import type { CategorySortMenu } from "@/states";

import styles from "./service.module.scss";

interface Props {
  serviceIds: string | null;
  setLocalMenu: Dispatch<SetStateAction<CategorySortMenu>>;
}

const Service: React.FC<Props> = ({ serviceIds: serviceIdString, setLocalMenu }) => {
  const { data } = useSuspenseQuery<ServiceTitle[]>(["getServiceTitles"], () => getServiceTitlesApi());
  const serviceIds = serviceIdString === null ? [] : serviceIdString.split(",");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    const serviceIdArray = xor(serviceIds, [value]);
    setLocalMenu((prev) => ({ ...prev, serviceIds: serviceIdArray.join(",") }));
  };

  return (
    <section className={styles.wrapper}>
      <h2>편의 시설</h2>
      {data.map((item) => (
        <Fragment key={item.id}>
          <h3 className={styles.subTitle}>{item.name}</h3>
          <menu className={styles.list}>
            {item.services.map((service) => (
              <li key={service.id}>
                <label className={styles.checkButton}>
                  {service.name}
                  <input
                    value={service.id}
                    type="checkbox"
                    hidden
                    checked={serviceIds.includes(service.id)}
                    onChange={onChange}
                  />
                </label>
              </li>
            ))}
          </menu>
        </Fragment>
      ))}
    </section>
  );
};

export default Service;
