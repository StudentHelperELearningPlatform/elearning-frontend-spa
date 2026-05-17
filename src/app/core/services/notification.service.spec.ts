import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let messageService: { add: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    messageService = { add: vi.fn() };
    TestBed.configureTestingModule({
      providers: [{ provide: MessageService, useValue: messageService }],
    });
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => vi.restoreAllMocks());

  it('success delegates to MessageService with severity "success"', () => {
    service.success('Saved!');
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Saved!',
      life: 4000,
    });
  });

  it('success accepts a custom title', () => {
    service.success('Done', 'Custom');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success', summary: 'Custom', detail: 'Done' }),
    );
  });

  it('error delegates with severity "error"', () => {
    service.error('Broken');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error', summary: 'Error', detail: 'Broken', life: 5000 }),
    );
  });

  it('info delegates with severity "info"', () => {
    service.info('Heads up');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'info', summary: 'Info', detail: 'Heads up' }),
    );
  });

  it('warning delegates with severity "warn"', () => {
    service.warning('Careful');
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'warn', summary: 'Warning', detail: 'Careful' }),
    );
  });

  describe('without MessageService provided', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ providers: [] });
    });

    it('does not throw when calling any level (optional inject)', () => {
      const standalone = TestBed.inject(NotificationService);
      expect(() => {
        standalone.success('s');
        standalone.error('e');
        standalone.info('i');
        standalone.warning('w');
      }).not.toThrow();
    });
  });
});
