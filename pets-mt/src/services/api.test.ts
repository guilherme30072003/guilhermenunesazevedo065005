import { describe, it, expect, vi, beforeEach } from 'vitest';
import { petService, tutorService } from './api';
import axios from 'axios';

vi.mock('axios');

describe('API Services', () => {
    const mockToken = 'test-token';
    const mockAxios = axios as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('petService.getPets', () => {
        it('should fetch pets successfully', async () => {
            const mockPets = {
                content: [
                    { id: 1, nome: 'Fluffy', raca: 'Gato', idade: 3, tutorIds: [1] },
                    { id: 2, nome: 'Rex', raca: 'Cachorro', idade: 5, tutorIds: [2] }
                ],
                pageCount: 2
            };

            mockAxios.create.mockReturnValue({
                get: vi.fn().mockResolvedValue({ data: mockPets })
            });

            const result = await petService.getPets(mockToken, 0, 'Fluffy');
            expect(result.content).toHaveLength(2);
            expect(result.pageCount).toBe(2);
        });

        it('should handle error when fetching pets', async () => {
            const error = new Error('API Error');
            mockAxios.create.mockReturnValue({
                get: vi.fn().mockRejectedValue(error)
            });

            await expect(petService.getPets(mockToken)).rejects.toThrow('API Error');
        });
    });

    describe('petService.getPetById', () => {
        it('should fetch a single pet by ID', async () => {
            const mockPet = {
                id: 1,
                nome: 'Fluffy',
                raca: 'Gato',
                idade: 3,
                tutorIds: [1]
            };

            mockAxios.create.mockReturnValue({
                get: vi.fn().mockResolvedValue({ data: mockPet })
            });

            const result = await petService.getPetById(mockToken, 1);
            expect(result.id).toBe(1);
            expect(result.nome).toBe('Fluffy');
        });
    });

    describe('tutorService.getTutorById', () => {
        it('should fetch a tutor by ID', async () => {
            const mockTutor = {
                id: 1,
                nome: 'João',
                email: 'joao@email.com',
                telefone: '(11) 99999-9999',
                cpf: '123.456.789-01'
            };

            mockAxios.create.mockReturnValue({
                get: vi.fn().mockResolvedValue({ data: mockTutor })
            });

            const result = await tutorService.getTutorById(mockToken, 1);
            expect(result.id).toBe(1);
            expect(result.nome).toBe('João');
            expect(result.email).toBe('joao@email.com');
        });
    });

    describe('tutorService.getPetsByTutorId', () => {
        it('should fetch pets by tutor ID', async () => {
            const mockPets = [
                { id: 1, nome: 'Fluffy', raca: 'Gato', idade: 3, tutorIds: [1] },
                { id: 2, nome: 'Bella', raca: 'Gato', idade: 2, tutorIds: [1] }
            ];

            mockAxios.create.mockReturnValue({
                get: vi.fn().mockResolvedValue({ data: mockPets })
            });

            const result = await tutorService.getPetsByTutorId(mockToken, 1);
            expect(result).toHaveLength(2);
            expect(result[0].nome).toBe('Fluffy');
        });
    });

    describe('tutorService.linkPetToTutor', () => {
        it('should link a pet to a tutor', async () => {
            const mockResponse = { success: true };

            mockAxios.create.mockReturnValue({
                post: vi.fn().mockResolvedValue({ data: mockResponse })
            });

            const result = await tutorService.linkPetToTutor(mockToken, 1, 2);
            expect(result.success).toBe(true);
        });
    });

    describe('tutorService.unlinkPetFromTutor', () => {
        it('should unlink a pet from a tutor', async () => {
            const mockResponse = { success: true };

            mockAxios.create.mockReturnValue({
                delete: vi.fn().mockResolvedValue({ data: mockResponse })
            });

            const result = await tutorService.unlinkPetFromTutor(mockToken, 1, 2);
            expect(result.success).toBe(true);
        });
    });
});
