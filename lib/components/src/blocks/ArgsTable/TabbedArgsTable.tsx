import React, { FC } from 'react';
import { ArgsTable, ArgsTableProps, SortType } from './ArgsTable';
import { TabsState } from '../../tabs/tabs';

export interface TabbedArgsTableProps {
  children?: React.ReactNode;
  tabs: Record<string, ArgsTableProps>;
  sort?: SortType;
}

export const TabbedArgsTable: FC<TabbedArgsTableProps> = ({ tabs, ...props }) => {
  const entries = Object.entries(tabs);

  if (entries.length === 1) {
    return <ArgsTable {...entries[0][1]} {...props} />;
  }

  return (
    <TabsState>
      {entries.map((entry) => {
        const [label, table] = entry;
        const id = `prop_table_div_${label}`;
        return ({ active }: { active: boolean }) => (
          <div key={id} id={id} title={label}>
            {active ? <ArgsTable key={`prop_table_${label}`} {...table} {...props} /> : null}
          </div>
        );
      })}
    </TabsState>
  );
};
