<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class VeilleNumeriqueController extends AbstractController
{
    #[Route('/veille/numerique', name: 'app_veille_numerique')]
    public function index(): Response
    {
        return $this->render('veille_numerique/index.html.twig', [
            'controller_name' => 'VeilleNumeriqueController',
        ]);
    }
}
