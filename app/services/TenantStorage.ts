import { AsyncLocalStorage } from 'async_hooks'
import db from '@adonisjs/lucid/services/db'

type TenantContext = {
  empresaId?: number
  tenantId?: number
}

class TenantStorage {
  private static storage = new AsyncLocalStorage<TenantContext>();


  static run(context: TenantContext, callback: () => void) {
    TenantStorage.storage.run(context, callback);
  }

  static getStore(): TenantContext | undefined {
    return TenantStorage.storage.getStore();
  }

  private getEmpresaId(): number | null {
  return TenantStorage.storage.getStore()?.empresaId ?? null
}

static setEmpresaId(empreId: number) {
     const store = TenantStorage.storage.getStore();
    if (store) {
      store.empresaId = empreId;
    } else {
      throw new Error('No active tenant context found');
    }
  }

  async getEmpresa() {
    const empresaId = this.getEmpresaId()
    if (!empresaId) {
      throw new Error('No hay empresaId en contexto')
    }

    return await db.from('empresas').where('id', empresaId).first()
  }

  static setTenantId(tenantId: number) {
    const store = TenantStorage.storage.getStore();
    if (store) {
      store.tenantId = tenantId;
    } else {
      throw new Error('No active tenant context found');
    }
  }

  static getTenantId(): number | undefined {
    return TenantStorage.storage.getStore()?.tenantId;
  }
}

export default TenantStorage;
