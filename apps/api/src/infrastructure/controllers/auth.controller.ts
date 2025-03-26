import express, { Request, Response } from 'express';
import { AuthService } from '../../application/services/auth.service';
import { SignUpDto, SignInDto } from '../../application/dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const router = express.Router();
const authService = new AuthService();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const signUpDto = plainToInstance(SignUpDto, req.body);
    const errors = await validate(signUpDto);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: errors });
    }

    const response = await authService.signUp(signUpDto);
    return res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const signInDto = plainToInstance(SignInDto, req.body);
    const errors = await validate(signInDto);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: 'Validation failed', details: errors });
    }
    const response = await authService.signIn(signInDto);
    return res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

export { router as authRouter };
