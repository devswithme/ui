'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import "../index.css";
import "./index.css";

// Types
interface TabsContextType {
    value: string;
    setValue: (v: string) => void;
}

interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    variant: TabsVariant;
}

type TabsVariant = "line";

interface TabsListProps {
    children: ReactNode;
}

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
}

// Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs components must be used within a <Tabs> component');
    }
    return context;
};

// Components
const Tabs = ({ defaultValue, children, variant = "line" }: TabsProps) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, setValue }}>
            <div
                data-theme="trakteer"
                data-variant={variant}
                className='tabs'
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
};

const TabsList = ({ children }: TabsListProps) => {
    return <div className='tabs-list'>{children}</div>;
};

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
    const { value: activeValue, setValue } = useTabsContext();
    const isActive = activeValue === value;

    return (
        <div
            role="button"
            onClick={() => setValue(value)}
            aria-selected={isActive}
            className='tabs-trigger'
        >
            {children}
        </div>
    );
};

const TabsContent = ({ value, children }: TabsContentProps) => {
    const { value: activeValue } = useTabsContext();

    if (activeValue !== value) {
        return null;
    }

    return <div className='tabs-content'>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };