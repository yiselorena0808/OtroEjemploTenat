import { AsyncLocalStorage } from 'async_hooks'

type TenantStore = {
  empresaId?: number
  tenantId?: number
}

export const tenantStorage = new AsyncLocalStorage<TenantStore>()

export const TenantStorage = {
  run: (context: TenantStore, callback: () => void) => tenantStorage.run(context, callback),

  getStore: (): TenantStore | undefined => tenantStorage.getStore(),

  setEmpresaId: (ide: number) => {
    const store = tenantStorage.getStore();
    if (store) store.empresaId = ide;
    else tenantStorage.enterWith({ empresaId: ide }); 
  },

  setTenantId: (ida: number) => {
    const store = tenantStorage.getStore();
    if (store) store.tenantId = ida;
    else tenantStorage.enterWith({ tenantId: ida });
  },
}