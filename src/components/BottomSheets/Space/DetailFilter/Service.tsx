"use client";

import { type Dispatch, Fragment, type MouseEventHandler, type SetStateAction } from "react";

import cx from "clsx";
import { xor } from "lodash-es";

import type { ServiceTitle } from "@/common/types/service";
import { useSuspenseQuery } from "@/hooks";
import { getServiceTitlesApi } from "@/services/service";
import type { SpaceSortMenu } from "@/states";

import styles from "./service.module.scss";

interface Props {
  serviceIds: string | null;
  setLocalMenu: Dispatch<SetStateAction<SpaceSortMenu>>;
}

const Service: React.FC<Props> = ({ serviceIds: serviceIdString, setLocalMenu }) => {
  const { data } = useSuspenseQuery<ServiceTitle[]>(["getServiceTitles"], () => getServiceTitlesApi());
  const serviceIds = serviceIdString === null ? [] : serviceIdString.split(",").filter(Boolean);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
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
                <button
                  type="button"
                  className={cx(styles.checkButton, { [styles.active]: serviceIds.includes(service.id) })}
                  onClick={onClick}
                  value={service.id}
                >
                  {service.name}
                </button>
              </li>
            ))}
          </menu>
        </Fragment>
      ))}
    </section>
  );
};

export default Service;
