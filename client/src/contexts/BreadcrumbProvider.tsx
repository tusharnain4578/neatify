import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface BreadcrumbContextType {
  breadcrumb: { title: string; pages: IBreadcrumb[] };
  setBreadcrumb: Dispatch<
    SetStateAction<{ title: string; pages: IBreadcrumb[] }>
  >;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }

  return context;
};

interface BreadcrumbProviderProps {
  children: ReactNode;
}

export const BreadcrumbProvider = ({ children }: BreadcrumbProviderProps) => {
  const [breadcrumb, setBreadcrumb] = useState<{
    title: string;
    pages: IBreadcrumb[];
  }>({
    title: '',
    pages: [],
  });

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
