/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import { TColor } from '@styles/color/color.variables';
import { Ticon } from '@styles/icon/icon-type';

export const Icon = ({
  className = '',
  color = 'text-1',
  ...props
}: React.SVGProps<SVGSVGElement> & { icon: Ticon; color?: TColor }) => {
  // @ts-ignore
  return <i className={classNames(props.icon, className, color)} {...props} />;
};
