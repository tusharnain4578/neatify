import React, { ReactElement } from 'react';

interface ICardProps {
  children: React.ReactNode;
}

const Card: React.FC<ICardProps> & {
  Header: React.FC<ICardSectionProps>;
  Body: React.FC<ICardSectionProps>;
} = ({ children }: ICardProps): ReactElement => {
  return (
    <div className="flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {children}
    </div>
  );
};
interface ICardSectionProps {
  children: React.ReactNode;
}

const Header: React.FC<ICardSectionProps> = ({
  children,
}: ICardSectionProps) => <div className="px-4 py-3 sm:px-6">{children}</div>;

const Body: React.FC<ICardSectionProps> = ({ children }: ICardSectionProps) => (
  <div className="px-4 py-4 sm:p-6">{children}</div>
);

Card.Header = Header;
Card.Body = Body;

export default Card;
