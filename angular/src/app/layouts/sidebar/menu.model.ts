export interface MenuItem {
  id: number;
  label: string;
  icon?: string;
  link?: string;
  isTitle?: boolean;
  parentId?: number;
  subItems?: MenuItem[];
  roles?: string[];
}
